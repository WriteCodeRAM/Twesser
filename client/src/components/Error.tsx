interface errorMsg {
  message: string;
}

function ErrorPage({ message }: errorMsg) {
  return (
    <div className="text-muted-red text-center font-bold absolute inset-0 p-4">
      {message}
    </div>
  );
}

export default ErrorPage;
