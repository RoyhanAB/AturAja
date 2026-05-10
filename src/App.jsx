import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Board from "./components/Board";
import Analytics from "./components/Analytics";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Modal from "./components/Modal";
import Login from "./components/Login";
import { supabase } from "./supabaseClient";
import { Toaster, toast } from "react-hot-toast";

const staticColumns = {
  "column-1": {
    id: "column-1",
    title: "Backlog",
    color: "var(--text-tertiary)",
    taskIds: [],
  },
  "column-2": {
    id: "column-2",
    title: "Akan Dikerjakan",
    color: "var(--accent)",
    taskIds: [],
  },
  "column-3": {
    id: "column-3",
    title: "Sedang Berjalan",
    color: "var(--priority-medium)",
    taskIds: [],
  },
  "column-4": {
    id: "column-4",
    title: "Selesai",
    color: "var(--priority-low)",
    taskIds: [],
  },
};
const columnOrder = ["column-1", "column-2", "column-3", "column-4"];

function App() {
  const [session, setSession] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [activeTab, setActiveTab] = useState("kanban");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [data, setData] = useState({
    tasks: {},
    columns: JSON.parse(JSON.stringify(staticColumns)),
    columnOrder,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
      if (session) fetchTasks(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchTasks(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchTasks = async (userId) => {
    const { data: fetchedTasks, error } = await supabase
      .from("tasks")
      .select("*")
      .order("position", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
      return;
    }

    const newTasks = {};
    const newColumns = JSON.parse(JSON.stringify(staticColumns));

    fetchedTasks.forEach((task) => {
      newTasks[task.id] = task;
      if (newColumns[task.column_id]) {
        newColumns[task.column_id].taskIds.push(task.id);
      }
    });

    setData({ tasks: newTasks, columns: newColumns, columnOrder });
  };

  const handleAddTask = async (newTaskData) => {
    const firstColumnId = columnOrder[1]; // Add to "To Do"
    const position = data.columns[firstColumnId].taskIds.length;

    const taskToInsert = {
      user_id: session.user.id,
      content: newTaskData.content,
      description: newTaskData.description,
      priority: newTaskData.priority,
      tags: newTaskData.tags,
      column_id: firstColumnId,
      position: position,
    };

    const { data: insertedTask, error } = await supabase
      .from("tasks")
      .insert([taskToInsert])
      .select()
      .single();

    if (error) {
      console.error("Error adding task:", error);
      toast.error("Gagal menambahkan tugas");
      return;
    }

    setIsModalOpen(false);
    toast.success("Tugas berhasil ditambahkan");

    const newColumn = { ...data.columns[firstColumnId] };
    newColumn.taskIds = [insertedTask.id, ...newColumn.taskIds];

    setData({
      ...data,
      tasks: { ...data.tasks, [insertedTask.id]: insertedTask },
      columns: { ...data.columns, [firstColumnId]: newColumn },
    });
  };

  const handleEditTask = async (updatedData) => {
    if (!editingTask) return;

    const { data: updatedTask, error } = await supabase
      .from("tasks")
      .update({
        content: updatedData.content,
        description: updatedData.description,
        priority: updatedData.priority,
        tags: updatedData.tags,
      })
      .eq("id", editingTask.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating task:", error);
      toast.error("Gagal memperbarui tugas");
      return;
    }

    setIsModalOpen(false);
    setEditingTask(null);
    toast.success("Tugas berhasil diperbarui");

    setData({
      ...data,
      tasks: { ...data.tasks, [updatedTask.id]: updatedTask },
    });
  };

  const handleSaveModal = (data) => {
    if (editingTask) {
      handleEditTask(data);
    } else {
      handleAddTask(data);
    }
  };

  const openNewTaskModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    const newData = { ...data };

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      newData.columns[startColumn.id] = { ...startColumn, taskIds: newTaskIds };
      setData(newData);
    } else {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);

      newData.columns[startColumn.id] = {
        ...startColumn,
        taskIds: startTaskIds,
      };
      newData.columns[finishColumn.id] = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      // Update task column locally
      newData.tasks[draggableId] = {
        ...newData.tasks[draggableId],
        column_id: destination.droppableId,
      };
      setData(newData);
    }

    const updates = [];
    const targetColumnIds =
      startColumn === finishColumn
        ? [startColumn.id]
        : [startColumn.id, finishColumn.id];

    targetColumnIds.forEach((colId) => {
      newData.columns[colId].taskIds.forEach((taskId, index) => {
        updates.push({
          id: taskId,
          column_id: colId,
          position: index,
          user_id: session.user.id,
        });
      });
    });

    const { error } = await supabase.from("tasks").upsert(updates);
    if (error) {
      console.error("Error updating positions:", error);
      fetchTasks(session.user.id);
    }
  };

  const handleDeleteTask = async (columnId, taskId) => {
    const newColumn = { ...data.columns[columnId] };
    newColumn.taskIds = newColumn.taskIds.filter((id) => id !== taskId);
    const newTasks = { ...data.tasks };
    delete newTasks[taskId];

    setData({
      ...data,
      tasks: newTasks,
      columns: { ...data.columns, [columnId]: newColumn },
    });

    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (error) {
      console.error("Error deleting task:", error);
      toast.error("Gagal menghapus tugas");
      fetchTasks(session.user.id);
    } else {
      toast.success("Tugas berhasil dihapus");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loadingSession) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg-app)",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!session) {
    return <Login setSession={setSession} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard data={data} userEmail={session.user.email} />;
      case "kanban":
        return (
          <Board
            data={data}
            handleDragEnd={handleDragEnd}
            handleDeleteTask={handleDeleteTask}
            searchQuery={searchQuery}
            onOpenModal={openNewTaskModal}
            onEditTask={openEditTaskModal}
          />
        );
      case "analytics":
        return <Analytics data={data} />;
      case "settings":
        return (
          <Settings userEmail={session.user.email} onLogout={handleLogout} />
        );
      default:
        return (
          <Board
            data={data}
            handleDragEnd={handleDragEnd}
            handleDeleteTask={handleDeleteTask}
            searchQuery={searchQuery}
            onOpenModal={openNewTaskModal}
            onEditTask={openEditTaskModal}
          />
        );
    }
  };

  return (
    <>
      <div className="app-background"></div>
      <div className="layout-container">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="main-content">
          <Topbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenModal={openNewTaskModal}
            userEmail={session.user.email}
            setActiveTab={setActiveTab}
          />
          {renderContent()}
        </div>
      </div>

      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveModal}
          initialData={editingTask}
        />
      )}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-panel)",
            color: "white",
            border: "1px solid var(--border-light)",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}

export default App;
