interface ModalProps {
  handleCloseAlert: () => void;
}
function Modal({ handleCloseAlert }: ModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 animate-pulse"></div>
      <div className="relative p-5 rounded-xl text-white z-10 bg-gega-main flex items-center flex-col gap-10 animate-pulse max-md:w-[350px]">
        <p className="text-2xl font-semibold pt-10">
          Səsverməni uğurla başa vurdunuz!
        </p>
        <p>
          Sizin səsiniz uğurla qeydə alınmışdır. Səsvermədə iştirak etdiyiniz
          üçün təşəkkürlər!
        </p>
        <button
          onClick={handleCloseAlert}
          className="bg-gega-white text-gega-main font-semibold text-lg px-4 py-2 mt-3 rounded-md"
        >
          Yekunlaşdır
        </button>
      </div>
    </div>
  );
}

export default Modal;
