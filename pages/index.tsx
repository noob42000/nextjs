import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";

export default function Page({ todos }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>TODO-title</title>
        <meta property="og:title" content="Todo title" />
        <meta property="og:description" content="A short description of your site or page content" />
        <meta property="og:url" content="https://nextjs-rho-topaz-21.vercel.app/" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:image" content="https://yourdomain.com/path-to-your-image.jpg" /> */}

        {/* Additional tags for Twitter etc. */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className="min-h-full">
        {todos.map((todo: Todo) => {
          return (
            <Link
              href={`/todo/${todo.id}`}
              key={todo.id}
              className="bg-slate-600 w-4/5 m-auto mt-2 mb-2  p-3 cursor-pointer block">
              <strong>UserId : {todo.userId}</strong>
              <pre>{todo.title}</pre>
            </Link>
          );
        })}
      </main>
    </>
  );
}

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const getStaticProps = (async (context) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  return { props: { todos: todos.splice(0, 10) } };
}) satisfies GetStaticProps<{
  todos: Todo[];
}>;
