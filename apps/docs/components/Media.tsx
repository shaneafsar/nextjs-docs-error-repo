import clsx from "clsx";
import Image from "next/image";

interface MediaProps {
  type: "video-youtube" | "video-vidyard" | "video-loop" | "image";
  alt: string;
  id: string;
  figcaption?: string;
  className?: string;
  [key: string]: any;
}

const Media = ({
  id,
  type,
  alt,
  figcaption,
  className,
  ...props
}: MediaProps) => {
  const cloudinaryId = process.env.CLOUDINARY_ID;
  if (id === "placeholder") {
    return (
      <Image
        {...props}
        className={clsx(className, "rounded-md border border-gray-200")}
        sizes="(max-width: 800w) 100vw, 50vw"
        loading="lazy"
        alt={alt}
        width={0}
        height={0}
        style={{ width: "100%", height: "auto" }}
        data-testid="placeholder-image"
        srcSet={`https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_800/l_text:verdana_75_bold:800/fl_layer_apply,g_south,y_20/images/${id} 800w,
            https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_1200/l_text:verdana_75_bold:1200/fl_layer_apply,g_south,y_20/images/${id} 1200w,
            https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_1800/l_text:verdana_75_bold:1800/fl_layer_apply,g_south,y_20/images/${id} 1800w,
            https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_2400/l_text:verdana_75_bold:2400/fl_layer_apply,g_south,y_20/images/${id} 2400w,`}
        src={`https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_1200/l_text:verdana_75_bold:1200/fl_layer_apply,g_south,y_20/images/${id}`}
      />
    );
  }

  if (type === "image") {
    const image = (
      <Image
        {...props}
        className={clsx(
          "rounded-md border border-gray-200",
          className || "h-auto w-full max-w-none"
        )}
        sizes="(max-width: 800w) 100vw, 50vw"
        loading="lazy"
        width={0}
        height={0}
        alt={alt}
        srcSet={`https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_800/images/${id} 800w,
        https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_1200/images/${id} 1200w,
        https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_1800/images/${id} 1800w,
        https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_2400/images/${id} 2400w,`}
        src={`https://res.cloudinary.com/${cloudinaryId}/image/upload/f_auto/q_auto/c_scale,w_1200/images/${id}`}
      />
    );

    if (figcaption) {
      return (
        <figure className="my-4">
          {image}
          <figcaption className="mt-2 text-center font-light italic">
            {figcaption}
          </figcaption>
        </figure>
      );
    }

    return image;
  }
  if (type === "video-youtube") {
    return (
      <div
        className={clsx(
          className,
          "overflow-hidden rounded-md border border-gray-200"
        )}
        {...props}
      >
        <iframe
          className="aspect-video w-full"
          loading="lazy"
          src={`https://www.youtube.com/embed/${id}?modestbranding=1&fs=0`}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
          data-testid="video-youtube"
        ></iframe>
      </div>
    );
  }

  if (type === "video-vidyard") {
    return (
      <div
        className={clsx(
          className,
          "overflow-hidden rounded-md border border-gray-200"
        )}
        {...props}
      >
        <iframe
          className="aspect-video w-full"
          loading="lazy"
          src={`https://play.vidyard.com/${id}.html?autoplay=0`}
          title={alt}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          allowFullScreen
          data-testid="video-vidyard"
        ></iframe>
      </div>
    );
  }

  if (type === "video-loop") {
    return (
      <video
        autoPlay
        muted
        loop
        title={alt}
        src={`https://res.cloudinary.com/${cloudinaryId}/video/upload/q_auto/f_auto/${id}`}
        data-testid="video-loop"
        className={className}
        {...props}
      ></video>
    );
  }
  return null;
};

export default Media;
