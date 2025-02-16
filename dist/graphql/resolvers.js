"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskResolver = void 0;
const db_1 = require("../config/db");
exports.taskResolver = {
    Query: {
        tasks: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield db_1.prisma.task.findMany();
        })
    },
    Mutation: {
        createTask: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { title, description, status }) {
            console.log('Task create request made');
            console.log(title, description, status);
            const task = yield db_1.prisma.task.create({
                data: { title, description, status }
            });
            return {
                message: 'Task created successfully',
                success: true
            };
        }),
        updateTask: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { id, title, description, status }) {
            try {
                const task = yield db_1.prisma.task.findUnique({ where: { id } });
                if (!task) {
                    throw new Error("Task not found");
                }
                yield db_1.prisma.task.update({
                    where: { id },
                    data: { title, description, status },
                });
                return {
                    message: "Task updated successfully",
                    success: true,
                };
            }
            catch (error) {
                console.error("Error updating task:", error);
                throw new Error("Failed to update task");
            }
        }),
        deleteTask: (_3, _c) => __awaiter(void 0, [_3, _c], void 0, function* (_, { id }) {
            try {
                const task = yield db_1.prisma.task.findUnique({
                    where: { id }
                });
                if (!task)
                    throw new Error("Task not found");
                yield db_1.prisma.task.delete({
                    where: { id }
                });
                return {
                    message: "Task deleted successfully",
                    success: true,
                    id
                };
            }
            catch (err) {
                console.log(err);
                throw new Error("Failed to delete task");
            }
        })
    }
};
