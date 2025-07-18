import RandomQuote from "../components/RandomQuote";

const Home = () => {
    return (
        <>
          <main id="main" style={{ display: "flex", flexDirection: "column", flexGrow: 1, minHeight: "100vh" }}>
            <RandomQuote />
          </main>
        </>
    );
}

export default Home;