const Sidebar = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minWidth: "250px",
        maxWidth: "250px",
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "100%",
          minWidth: "250px",
          maxWidth: "250px",
          height: "100vh",
          backgroundColor: "#CCC",
        }}
      >
        Sidebar
      </div>
    </div>
  );
};

export default Sidebar;
