import { GetStaticPaths, GetStaticProps } from "next";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Page({ todo }: { todo: Todo }) {
  return (
    <div>
      <strong>Userid : {todo?.userId}</strong>
      <p>You have visited this todo</p>
      <h1>{todo?.title}</h1>
    </div>
  );
}

export const getStaticPaths = (async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  // Get the paths we want to pre-render based on todos
  const paths = todos.slice(0, 10).map((todo: Todo) => ({
    params: { id: todo.id.toString() },
  }));
  return {
    paths: paths,
    fallback: true, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  const { params } = context;
  if (params) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
    const todo = await res.json();
    return { props: { todo } };
  } else {
    return { props: { todo: [] } };
  }
}) satisfies GetStaticProps<{
  todo: Todo;
}>;
