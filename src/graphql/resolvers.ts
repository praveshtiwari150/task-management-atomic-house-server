import { prisma } from "../config/db"
import { TaskStatus } from '@prisma/client';

interface CreateTask {
    title: string;
    description: string;
    status: TaskStatus;
}

interface UpdateTask{
    id: string;
    title?: string;
    description?: string;
    status?: "INPROGRESS" | "TODO" | "COMPLETED" | "CANCELLED"
}

export const taskResolver = {
    Query: {
        tasks: async () => {
            return await prisma.task.findMany()
        }
    },
    Mutation: {
        createTask: async (_: any, { title, description, status }: CreateTask) => {
            console.log('Task create request made');
            console.log(title, description, status);
            const task = await prisma.task.create({
                data: { title, description, status }
            });
            return {
                message: 'Task created successfully',
                success: true
            };
        },

        updateTask: async (_: any, { id, title, description, status }: UpdateTask) => {
            try {
                const task = await prisma.task.findUnique({ where: { id } });

                if (!task) {
                    throw new Error("Task not found");
                }

                await prisma.task.update({
                    where: { id },
                    data: { title, description, status },
                });

                return {
                    message: "Task updated successfully",
                    success: true,
                };
            } catch (error) {
                console.error("Error updating task:", error);
                throw new Error("Failed to update task");
            }
        },

        deleteTask: async (_: any, { id }: { id: string }) => {
            try {
                const task = await prisma.task.findUnique({
                    where: { id }
                });

                if (!task) throw new Error("Task not found");

                await prisma.task.delete({
                    where: {id}
                })

                return {
                    message: "Task deleted successfully",
                    success: true,
                    id
                }
            }
            catch (err) {
                console.log(err);
                throw new Error("Failed to delete task");
            }
        }
    }
}