import Form from "@/components/Form/Form";

export default function Home() {
  return (
    <main className="flex justify-center pt-0 md:pt-2">
      <div className="md:w-[768px] w-full bg-dark-grey-blue pt-2 md:pt-0">
        <h1
          className="text-black md:text-lg p-1 text-center text-3xl mb-2 md:mb-0"
          data-testid="page-header"
        >
          Notification Form
        </h1>
        <Form />
      </div>
    </main>
  );
}
