import type { ImgHTMLAttributes } from "react";
import { useState, useEffect } from "react";
import styles from "./Avatar.module.scss";
import photoCover from "@/assets/photo-cover.svg";
import { useTranslation } from "react-i18next";

interface AvatarProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

function Avatar({
  src,
  alt,
  size = "medium",
  className = "",
  ...imgProps
}: AvatarProps) {
  const { t } = useTranslation();
  const [imageSrc, setImageSrc] = useState(photoCover);

  const avatarClasses = `${styles.avatar} ${styles[size]} ${className}`.trim();

  const handleError = () => {
    setImageSrc(photoCover);
  };

  // Load the actual image from API when src changes
  useEffect(() => {
    if (src && src !== photoCover) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
      };
      img.onerror = () => {
        setImageSrc(photoCover);
      };
      img.src = src;
    }
  }, [src]);

  return (
    <div className={avatarClasses}>
      <img
        src={imageSrc}
        alt={imageSrc === photoCover ? t("avatar.defaultAlt") : alt}
        className={styles.photo}
        onError={handleError}
        {...imgProps}
      />
    </div>
  );
}

export default Avatar;
