import { UploadDropzone } from "@/lib/uploadthing";
import { UploadThingError } from "uploadthing/server";
import { Json } from "@uploadthing/shared";
import { toast } from "sonner";

type Props = {
  onChange: (urls: string[]) => void;
  type: "image" | "file";
};

const Uploader = ({ type, onChange }: Props) => {
  return (
    <UploadDropzone
      endpoint={type}
      onClientUploadComplete={(res) => onChange(res.map((item) => item.url))}
      onUploadError={(error: UploadThingError<Json>) => {
        toast.error(error.message);
      }}
    />
  );
};

export default Uploader;
