const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        height: "100vh",
        width: "100%",
        display: "flex",
        top: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        zIndex: "9999999",
      }}
    >
      <img
        src={`${import.meta.env.VITE_PUBLIC_URL}images/spinner.gif`}
        alt=""
      />
    </div>
  );
};

export default Loader;
