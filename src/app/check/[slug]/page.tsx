const CheckSlug = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="flex flex-col space-y-2">
      <h2>URL Check</h2>
      <p>Slug: {params.slug}</p>
    </div>
  );
};

export default CheckSlug;
