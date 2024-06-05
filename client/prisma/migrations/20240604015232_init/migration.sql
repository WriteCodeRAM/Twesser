-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "answerChoices" TEXT[],
    "blurredURL" TEXT NOT NULL,
    "unblurredURL" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);
