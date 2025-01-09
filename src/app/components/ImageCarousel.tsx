"use client";
import Image from "next/image";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Project } from "../../../lib/api";

type Props = {
  project: Project;
};

export default function ImageCarousel({ project }: Props) {
  const images = [
    { src: project.thumbnail.url, alt: `${project.title} thumbnail` },
    ...project.imagesCollection.items.map((item, index) => ({
      src: item.url,
      alt: `${project.title} image ${index + 1}`,
    })),
  ];

  return (
    <Carousel>
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="border-none">
              <CardContent className="flex aspect-square items-center justify-center p-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={400}
                  className="object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
