interface errorMsg {
  message: string;
}

function ErrorPage({ message }: errorMsg) {
  return <div className="text-muted-red text-center font-bold">{message}</div>;
}

export default ErrorPage;
