interface Params {
  params: {
    postId: number;
  };
}
export default function Page({ params }: Params) {
  return <div>{JSON.stringify(params)}</div>;
}
