import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = { url: string };

const FilePreview = ({ url }: Props) => {
  return (
    <Link href={url} target="_blank">
      <Button variant="secondary">
        <ExternalLink className="mr-2 h-4 w-4" /> Open File
      </Button>
    </Link>
  );
};

export default FilePreview;
