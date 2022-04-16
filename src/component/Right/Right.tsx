interface TribeProp {
  name: string;
  id: string;
  context?: string;
}
interface Props {
  spaces: TribeProp[];
  posts: TribeProp[];
}

const Right = ({ spaces, posts }: Props): JSX.Element => {
  return (
    <div className="rightContainer">
      <div className="card-body">
        <div className="text-title">The Spaces</div>
        <div className="text-item">
          {spaces.length == 0 ? (
            <div className="custom-spinner" />
          ) : (
            spaces.map((d) => <div key={d.id}>{d.name?.toUpperCase()}</div>)
          )}
        </div>
        <div className="text-title">The Posts</div>
        <div className="text-item">
          {posts.length == 0 ? (
            <div className="custom-spinner" />
          ) : (
            posts.map((d) => <div key={d.id}>{d.context?.toUpperCase()}</div>)
          )}
        </div>
      </div>
    </div>
  );
};

export default Right;
