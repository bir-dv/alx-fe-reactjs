import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    expect(screen.getByText("Master JavaScript")).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new task");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("toggles a todo item", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");

    fireEvent.click(todoItem);
    expect(todoItem).toHaveClass("line-through");

    fireEvent.click(todoItem);
    expect(todoItem).not.toHaveClass("line-through");
  });

  test("deletes a todo", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");
    const deleteButton = todoItem.nextSibling;

    fireEvent.click(deleteButton);

    expect(todoItem).not.toBeInTheDocument();
  });
});
