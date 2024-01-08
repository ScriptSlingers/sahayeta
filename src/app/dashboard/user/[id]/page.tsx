const SingleUserPage = ({ params }: { params: { id: string } }) => {
  const userId = params.id
  return <div>{userId}</div>
}

export default SingleUserPage
