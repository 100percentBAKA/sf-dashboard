import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

/*
 * Sidebar and the Navbar components will do inside the Root component
 * The MainArea of the dashboard will be displayed using the "Outlet"
 */

const Root = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="hidden md:block h-full fixed left-0 top-0 w-[280px] xl:w-[350px]">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex-1 md:ml-[280px] xl:ml-[350px] p-6">
        <Navbar />

        {/* Main working area */}
        <main className="flex-1 mt-10 rounded-[10px] max-w-[1400px] mx-auto">
          <Outlet />
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
          itaque consectetur, ratione iure quam sint ab alias maxime nam. Ipsum,
          ratione impedit praesentium delectus voluptatum ipsa officiis debitis
          ipsam atque iste at blanditiis reiciendis nam sapiente fugit dolores
          tenetur libero odit recusandae quam soluta omnis molestiae. Quia
          consequuntur cumque nulla eum, pariatur quo iste vitae nobis, magni
          possimus labore reiciendis eveniet ut. Minus officia esse recusandae
          voluptates quia ut eum dolor delectus ipsam laborum veniam placeat,
          alias animi, amet odit? Libero voluptates, fugiat voluptas cumque eius
          ratione impedit. A, numquam delectus. Minima, laborum omnis?
          Necessitatibus, cum! Aliquid odit, beatae aut architecto officiis cum
          enim accusamus quia ad mollitia, qui vitae praesentium similique
          corporis accusantium aspernatur, eligendi tenetur recusandae debitis
          harum hic voluptates. Fugit eum temporibus repudiandae, facere iste
          corporis hic ratione numquam, necessitatibus expedita quas odit quidem
          doloremque et, accusantium quia eaque quos! Officiis consequatur quas,
          tempore non ipsam commodi quaerat expedita aspernatur dolores
          voluptates eum architecto magni? Ducimus, ad atque. Aperiam, facilis
          cum. Eaque, repudiandae incidunt. Maxime error labore totam
          exercitationem, saepe iusto aperiam officiis culpa accusantium beatae
          molestiae veritatis magnam explicabo dolorum aliquam cumque quo animi
          dolores ducimus, corporis soluta deserunt dolor quod rem. Ad labore
          excepturi iure! */}
        </main>
      </div>
    </div>
  );
};

export default Root;
