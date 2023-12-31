import React, { useEffect, useState } from "react";
import SingleCard from "./Components/SingleCard";
import Swal from "sweetalert2";

function App() {
  const [ModalData, setModalData] = useState(null);
  const [incompleted, setIncompleted] = useState(null);
  const [doing, setDoing] = useState(null);
  const [overday, setoverday] = useState(null);
  const [todo, settodo] = useState(null);
  const [underReview, setunderReview] = useState(null);
  const [completed, setcompleted] = useState(null);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    fetch("https://seotaskdhaka.vercel.app/getincomplete")
      .then((res) => res.json())
      .then((data) => setIncompleted(data));
    fetch("https://seotaskdhaka.vercel.app/getcompleted")
      .then((res) => res.json())
      .then((data) => setcompleted(data));
    fetch("https://seotaskdhaka.vercel.app/getdoing")
      .then((res) => res.json())
      .then((data) => setDoing(data));
    fetch("https://seotaskdhaka.vercel.app/getoverday")
      .then((res) => res.json())
      .then((data) => setoverday(data));
    fetch("https://seotaskdhaka.vercel.app/gettodo")
      .then((res) => res.json())
      .then((data) => settodo(data));
    fetch("https://seotaskdhaka.vercel.app/getunderReview")
      .then((res) => res.json())
      .then((data) => setunderReview(data));
  }, [loadData]);

  const attachmentsfunction = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const message = event.target.message.value;
    const file = event.target.file.value;
    if (!name || !message || !file) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Fill all input first!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    const Modaldata = { ...ModalData, name, message, file };
    console.log(Modaldata);

    fetch("https://seotaskdhaka.vercel.app/modaldatapost",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(Modaldata)
      }).then(res=> res.json()).then(data => {
       if(data.modifiedCount){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
       }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Something went wrong try again',
          showConfirmButton: false,
          timer: 1500
        });
       }
        setLoadData(!loadData);
      });

    event.target.reset();
    document.querySelector("#my_modal_6").checked = false;
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-base-300">
        <div className="bg-white w-11/12 mx-auto h-[calc(100vh-100px)] min-h-[400px] my-5">
          <div className="border-y h-full p-5 overflow-x-auto flex flex-nowrap">
            {/* Incomplete tab is from here */}
            <div className="my-5 bg-base-300 p-5 rounded-sm overflow-y-auto min-w-fit">
              <div className="flex justify-start items-center gap-2 mb-5">
                <div className="w-5 h-5 bg-orange-800 rounded-s-full"></div>
                <h1 className="font-bold">Incomplete</h1>
              </div>
              {incompleted &&
                incompleted.map((card, index) => (
                  <SingleCard
                    card={card}
                    key={index}
                    SetModalData={setModalData}
                    tittle="incomplete"
                  />
                ))}
            </div>
            {/* complete tab is from here */}
            <div className="my-5 bg-base-300 p-5 rounded-sm overflow-y-auto min-w-fit">
              <div className="flex justify-start items-center gap-2 mb-5">
                <div className="w-5 h-5 bg-red-500 rounded-s-full"></div>
                <h1 className="font-bold">Completed</h1>
              </div>
              {completed &&
                completed.map((card, index) => (
                  <SingleCard
                    card={card}
                    key={index}
                    SetModalData={setModalData}
                    tittle="completed"
                  />
                ))}
            </div>
            {/* complete tab is from here */}
            <div className="my-5 bg-base-300 p-5 rounded-sm overflow-y-auto min-w-fit">
              <div className="flex justify-start items-center gap-2 mb-5">
                <div className="w-5 h-5 bg-yellow-500 rounded-s-full"></div>
                <h1 className="font-bold">Doing</h1>
              </div>
              {doing &&
                doing.map((card, index) => (
                  <SingleCard
                    card={card}
                    key={index}
                    SetModalData={setModalData}
                    tittle="doing"
                  />
                ))}
            </div>
            {/* complete tab is from here */}
            <div className="my-5 bg-base-300 p-5 rounded-sm overflow-y-auto min-w-fit">
              <div className="flex justify-start items-center gap-2 mb-5">
                <div className="w-5 h-5 bg-blue-800 rounded-s-full"></div>
                <h1 className="font-bold">Over Day</h1>
              </div>
              {overday &&
                overday.map((card, index) => (
                  <SingleCard
                    card={card}
                    key={index}
                    SetModalData={setModalData}
                    tittle="overday"
                  />
                ))}
            </div>
            {/* complete tab is from here */}
            <div className="my-5 bg-base-300 p-5 rounded-sm overflow-y-auto min-w-fit">
              <div className="flex justify-start items-center gap-2 mb-5">
                <div className="w-5 h-5 bg-pink-800 rounded-s-full"></div>
                <h1 className="font-bold">To Do</h1>
              </div>
              {todo &&
                todo.map((card, index) => (
                  <SingleCard
                    card={card}
                    key={index}
                    SetModalData={setModalData}
                    tittle="todo"
                  />
                ))}
            </div>
            {/* complete tab is from here */}
            <div className="my-5 bg-base-300 p-5 rounded-sm overflow-y-auto min-w-fit">
              <div className="flex justify-start items-center gap-2 mb-5">
                <div className="w-5 h-5 bg-black rounded-s-full"></div>
                <h1 className="font-bold">Under Review</h1>
              </div>
              {underReview &&
                underReview.map((card, index) => (
                  <SingleCard
                    card={card}
                    key={index}
                    SetModalData={setModalData}
                    tittle="underreview"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div>
            <div className="modal-action absolute top-0 right-5">
              <label htmlFor="my_modal_6" className="px-3 py-1 text-red-600 border border-red-600 rounded-full">
                *
              </label>
            </div>
            <h1 className="font-bold text-2xl mb-5">Attachments</h1>
            <form onSubmit={attachmentsfunction} className="space-y-2">
              <input
                className="border outline-none rounded-md px-3 py-1 text-sm block w-full"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
              <textarea
                className="border outline-none rounded-md px-3 py-1 text-sm block w-full"
                name="message"
                id="message"
                cols="30"
                rows="5"
                placeholder="You Message"
              ></textarea>
              <input
                className="outline-none py-1 text-sm block w-full"
                type="file"
                name="file"
                id="file"
              />
              <input
                className="border outline-none rounded-md px-3 py-1 text-sm block w-full hover:scale-105 bg-green-500 font-bold text-white tracking-widest"
                type="submit"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
