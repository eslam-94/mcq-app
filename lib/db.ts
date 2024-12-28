import { auth } from '@/auth';
import { sql } from '@vercel/postgres';
import { 
    Record, 
    RecordOptions, 
    Category, 
    Result, 
    User
} from "./types";

export async function registerUserInDb(name: string, email: string, password: string, verfiy: boolean) {
    try {
        await sql`
            INSERT INTO users (name, email, password, isverified)
            VALUES (${name}, ${email}, ${password}, ${verfiy})
        `;
    } catch {
        throw new Error("failed to register user");
    }
}

export async function fetchUserFromDb(email: string) {
    try {
        const users = await sql<User>` SELECT * FROM users WHERE email=${email}`;
        return users.rows[0]
    } catch (error) {
        console.log("Database: Failed to Fetch user.",error);
    }
}

export async function fetchCategoriesFromDb() {
    try {
        const result = await sql<Category>` SELECT * FROM categories`;
        return result.rows
    } catch (error) {
        console.log("Database: Failed to Fetch categories.",error);
    }
}

export async function createRecordDb(options: RecordOptions) {
    try {
        const session = await auth()
 
        const isAuthenticated = !!session?.user;

        if (!isAuthenticated) throw new Error("authentication failed");

        const record = await sql<Record>`
          INSERT INTO records (categoryId, questionsNo, timer, practice, userId)
          VALUES (${options.category}, ${options.questionsNo}, ${options.timer}, ${options.practice}, ${session.user?.id})
          RETURNING *
        `;
        console.log("Database: record created Successfully.");
        return record.rows[0]
    } catch (error) {
        console.log("Database Error: Failed to create record.",error);
    }
}

export async function fetchRecordFromDb(recordId: string): Promise<Result | undefined> {
    try {
        const session = await auth()
        
        const isAuthenticated = !!session?.user;

        if (!isAuthenticated) throw new Error("authentication failed");

        const record = await sql<Record>`
          SELECT * FROM records WHERE recordId=${recordId};
        `;
        
        const isAuthorized = session.user?.id === record.rows[0].userid || session.user?.role === "admin";
        
        if (!isAuthorized) throw new Error("authorization failed");

        return {
            questionsNo: record.rows[0].questionsno,
            right: record.rows[0].right,
            wrong: record.rows[0].wrong,
            skipped: record.rows[0].questionsskipped.length,
        }
    } catch (error) {
        console.log("Database Error: Failed to fetch record.", error);
    }
}