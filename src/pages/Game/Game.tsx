import MenuSamping from "@/components/MenuSamping";

const Game = () => {
  return (
    <>
      <header className="flex justify-between items-center">
        <div className="flex space-x-5">
          <h1 className="md:text-xl font-bold">Game</h1>
        </div>
        <MenuSamping />
      </header>

      <main></main>
    </>
  );
};

export default Game;
