const ConnectedUsers = ({ users }) => (
  <div className="user-list">
    <h4 className="text-info">Connected Users</h4>
    {users.map((u, idx) => (
      <h6 className="text-center" key={idx}>{u}</h6>
    ))}
  </div>
);

export default ConnectedUsers;
