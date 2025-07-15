import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Calendar, 
  MoreHorizontal, 
  Trash2, 
  Edit, 
  Clock,
  CheckCircle2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Task } from '@/hooks/useTasks';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'bg-red-500/10 text-red-700 border-red-200';
    case 'high':
      return 'bg-orange-500/10 text-orange-700 border-orange-200';
    case 'medium':
      return 'bg-blue-500/10 text-blue-700 border-blue-200';
    case 'low':
      return 'bg-gray-500/10 text-gray-700 border-gray-200';
    default:
      return 'bg-gray-500/10 text-gray-700 border-gray-200';
  }
};

const formatDueDate = (dateString: string) => {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else {
    return format(date, 'MMM dd');
  }
};

const getDueDateColor = (dateString: string) => {
  const date = new Date(dateString);
  
  if (isPast(date) && !isToday(date)) {
    return 'text-red-600';
  } else if (isToday(date)) {
    return 'text-orange-600';
  } else if (isTomorrow(date)) {
    return 'text-blue-600';
  }
  return 'text-muted-foreground';
};

export const TaskList = ({ tasks, onToggleComplete, onDelete, loading }: TaskListProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <CheckCircle2 className="h-12 w-12 text-muted-foreground" />
          <div>
            <h3 className="font-semibold text-lg">No tasks yet</h3>
            <p className="text-muted-foreground">Create your first task to get started</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Card key={task.id} className={`transition-all hover:shadow-sm ${task.completed ? 'opacity-60' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task.id)}
                className="mt-1"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                    {task.title}
                  </h3>
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
                
                {task.description && (
                  <p className={`text-sm mb-2 ${task.completed ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {task.due_date && (
                    <div className={`flex items-center gap-1 ${getDueDateColor(task.due_date)}`}>
                      <Calendar className="h-3 w-3" />
                      <span>{formatDueDate(task.due_date)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{format(new Date(task.created_at), 'MMM dd')}</span>
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => onDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};