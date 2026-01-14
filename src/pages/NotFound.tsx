import notFoundImage from '@assets/images/notFoundImage.gif';

const NotFound = () => {
  return (
    <div className="h-full grid place-items-center overflow-hidden">
      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="max-w-lg w-full"
      />
    </div>
  );
};

export default NotFound;
