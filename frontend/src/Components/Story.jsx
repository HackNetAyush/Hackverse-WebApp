/* eslint-disable react/prop-types */
import { Chip, Avatar } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

const Story = (props) => {
  return (
    <div className="inline-block w-32 h-full overflow-hidden">
      <div className="relative h-full w-[120px] flex  rounded-2xl  items-end justify-center overflow-hidden border-box">
        <Image
          alt="NextUI Fruit Image with Zoom"
          src={props.storyImgUrl}
          className="w-[100%] h-[190px] z-0"
          loading="eager"
          showSkeleton
          isZoomed
          disableAnimation={false}
          disableSkeleton={false}
          // isBlurred
        />
        <div className="absolute overlay z-100 w-full h-full flex items-end justify-center pb-2 pointer-events-none">
          <Chip
            className="z-10"
            variant="flat"
            avatar={<Avatar name={props.initials} src={props.dpUrl} />}
          >
            {props.name}
          </Chip>
        </div>
      </div>
    </div>
  );
};

export default Story;
