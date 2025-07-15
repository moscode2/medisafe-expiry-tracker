import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";
import { Plus, ListTodo, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { tasks, loading, createTask, toggleTaskComplete, deleteTask } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);

  const completedTasks = tasks.filter(task => task.completed);
  const pendingTasks = tasks.filter(task => !task.completed);
  const urgentTasks = pendingTasks.filter(task => task.priority === 'urgent');
  const overdueTasks = pendingTasks.filter(task => 
    task.due_date && new Date(task.due_date) < new Date()
  );

  const handleCreateTask = async (taskData: any) => {
    await createTask(taskData);
    setShowTaskForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome to TaskMaster AI</h1>
            <p className="text-muted-foreground mt-2">
              Manage your tasks with AI-powered insights and prioritization
            </p>
          </div>
          <Button onClick={() => setShowTaskForm(!showTaskForm)} size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            {showTaskForm ? 'Cancel' : 'Add New Task'}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <ListTodo className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="text-2xl font-bold">{pendingTasks.length}</h3>
              <p className="text-sm text-muted-foreground">Pending Tasks</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-2xl font-bold">{completedTasks.length}</h3>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 text-red-500" />
              <h3 className="text-2xl font-bold">{urgentTasks.length}</h3>
              <p className="text-sm text-muted-foreground">Urgent</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <h3 className="text-2xl font-bold">{overdueTasks.length}</h3>
              <p className="text-sm text-muted-foreground">Overdue</p>
            </CardContent>
          </Card>
        </div>

        {/* Task Form */}
        {showTaskForm && (
          <TaskForm onSubmit={handleCreateTask} loading={loading} />
        )}

        {/* Tasks Management */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Tasks ({tasks.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
            <TabsTrigger value="urgent">Urgent ({urgentTasks.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <TaskList 
              tasks={tasks}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
              loading={loading}
            />
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <TaskList 
              tasks={pendingTasks}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
              loading={loading}
            />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <TaskList 
              tasks={completedTasks}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
              loading={loading}
            />
          </TabsContent>
          
          <TabsContent value="urgent" className="mt-6">
            <TaskList 
              tasks={urgentTasks}
              onToggleComplete={toggleTaskComplete}
              onDelete={deleteTask}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;