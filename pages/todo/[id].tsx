type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function Page({ todo }) {
  console.log({ todo });
  return (
    <div>
      <strong>Userid : {todo.userId}</strong>
      <p>You have visited this todo</p>
      <h1>{todo.title}</h1>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  // Get the paths we want to pre-render based on todos
  const paths = todos.slice(0, 10).map((todo) => ({
    params: { id: todo.id.toString() },
  }));

  console.log(paths);
  return { paths, fallback: true };
};

export async function getStaticProps({ params }) {
  console.log(params, "params");
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const todo = await res.json();

  return { props: { todo } };
}
