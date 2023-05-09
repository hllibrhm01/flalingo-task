<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use SoftDeletes;

    protected $table = 'tasks';
    protected $fillable = [
        'title',
        'description',
        'status',
        'due_date',
    ];

    public static function storeTask($request)
    {
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;
        $task->due_date = $request->due_date;
        $task->save();
        return $task;
    }

    public static function updateTask($request, $id)
    {
        $task = Task::find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found'
            ], 404);
        }

        $task->title = $request->title;
        $task->description = $request->description;
        $task->status = $request->status;
        $task->due_date = $request->due_date;
        $task->save();
        return $task;
    }

    public static function deleteTask($id)
    {
        $task = Task::find($id);
        $task->delete();
        return $task;
    }

    public static function getTask($id)
    {
        $task = Task::find($id);
        return $task;
    }

    public static function getAllTasks()
    {
        $tasks = Task::all();
        return $tasks;
    }

}
