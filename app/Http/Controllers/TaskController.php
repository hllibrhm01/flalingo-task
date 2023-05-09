<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Mail\EmailSender;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Redis;
use App\Mail\WelcomeMail;

class TaskController extends Controller
{
    public function store(TaskRequest $request)
    {
        $task = Task::storeTask($request);
        Redis::del('tasks');
        Mail::to($request->user()->email)->send(new EmailSender($request->user()));
        if (Mail::failures() != 0) {
            return "Email has been sent successfully.";
        }
        return response()->json([
            'task' => $task,
            'message' => 'Task created successfully'
        ], 200);
    }

    public function updateTask(Request $request)
    {
        $id = $request->id;
        $task = Task::updateTask($request, $id);
        
        if (!$task) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        }

        Redis::del('tasks');
        return response()->json([
            'task' => $task,
            'message' => 'Task updated successfully'
        ], 200);
    }

    public function getTask($id)
    {
        $task = Task::getTask($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        }

        return response()->json([
            'task' => $task,
            'message' => 'Task retrieved successfully'
        ], 200);
    }

    public function getAllTasks()
    {
        $tasks = Redis::get('tasks');   

        if (!$tasks) {
            $tasks = Task::getAllTasks();
            Redis::set('tasks', json_encode($tasks));
        }

        return response()->json([
            'tasks' => json_decode($tasks),
            'message' => 'Tasks retrieved successfully'
        ], 200);
    }

    public function deleteTask($id)
    {
        $task = Task::deleteTask($id);
        Redis::del('tasks');
        return response()->json([
            'task' => $task,
            'message' => 'Task deleted successfully'
        ], 200);
    }

}
