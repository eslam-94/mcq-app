import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createQuizAction } from "@/lib/actions";
import { fetchCategoriesFromDb } from "@/lib/db";

export default async function Page() {
    const subjects = await fetchCategoriesFromDb()
    
    return (
        <>
        <div className="flex items-center justify-center">
            <form action={createQuizAction}>
                <Card>
                    <CardHeader/>    
                    <CardContent className="space-y-5">
                        <Select name="category" required>
                            <SelectTrigger className="min-w-[300px]">
                                <SelectValue placeholder="Choose Category"/>
                            </SelectTrigger>
                            <SelectContent>
                            {
                                subjects?.map( item => <SelectItem key={item.categoryid} value={item.categoryid}>{item.categoryname}</SelectItem> )
                            }
                            </SelectContent>
                        </Select>
                        
                        <Select name="difficulty" required>
                            <SelectTrigger className="min-w-[300px]">
                                <SelectValue placeholder="Choose Difficulty "/>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select name="questionsNo" required>
                            <SelectTrigger className="min-w-[300px]">
                                <SelectValue placeholder="Choose Questions number "/>
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="5">5 questions</SelectItem>
                            <SelectItem value="10">10 questions</SelectItem>
                            <SelectItem value="15">15 questions</SelectItem>
                            <SelectItem value="20">20 questions</SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center space-x-2">
                            <Switch name="timer" id="timer" />
                            <Label htmlFor="timer">Timer Mode</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch name="practice" id="practice" />
                            <Label htmlFor="practice">Practice Mode</Label>
                        </div>
                        
                        <Button>Start</Button>
                    </CardContent>
                    <CardFooter/>
                </Card>
            </form>
       </div>
        </>
    )
}