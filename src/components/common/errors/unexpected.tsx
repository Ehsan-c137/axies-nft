interface IProps {
  error: Error;
}

export default function UnexpectedError({ error }: IProps) {
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = <p>Error: {error?.message}</p>;
  } else {
    errorMessage = <p>something went wrong</p>;
  }

  return <div className="w-full flex justify-center">{errorMessage}</div>;
}
