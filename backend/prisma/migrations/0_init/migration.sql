-- CreateTable
CREATE TABLE "activity" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "dt_initial" TIMESTAMP(6) NOT NULL,
    "dt_final" TIMESTAMP(6) NOT NULL,
    "category_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATE NOT NULL,
    "updated_at" DATE NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    
    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- Insert data into the category table
INSERT INTO "category" ("description", "created_at", "updated_at") VALUES
('Work', '2023-07-01', '2023-07-01'),
('Exercise', '2023-07-01', '2023-07-01'),
('Study', '2023-07-01', '2023-07-01'),
('Leisure', '2023-07-01', '2023-07-01'),
('Other', '2023-07-01', '2023-07-01');

-- Insert data into the user_profile table
INSERT INTO "user_profile" ("first_name", "last_name", "email", "password") VALUES
('John', 'Doe', 'john.doe@example.com', 'password123'),
('Jane', 'Smith', 'jane.smith@example.com', 'securepassword'),
('Alice', 'Johnson', 'alice.johnson@example.com', 'mypassword'),
('Bob', 'Brown', 'bob.brown@example.com', 'password456'),
('Carol', 'Davis', 'carol.davis@example.com', 'password789');


-- Insert data into the activity table
INSERT INTO "activity" ("description", "dt_initial", "dt_final", "category_id", "user_id") VALUES
('Morning run', '2024-07-07 06:00:00', '2024-07-07 07:00:00', 2, 1),
('Project meeting', '2024-07-07 09:00:00', '2024-07-07 10:30:00', 1, 2),
('Study for exams', '2024-07-07 14:00:00', '2024-07-07 16:00:00', 3, 3),
('Watch a movie', '2024-07-07 18:00:00', '2024-07-07 20:00:00', 4, 4),
('Grocery shopping', '2024-07-07 10:00:00', '2024-07-07 11:00:00', 5, 5);

