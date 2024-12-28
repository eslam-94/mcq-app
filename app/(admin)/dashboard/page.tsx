import { Barchart } from "@/components/bar-chart";
import { Metercard } from "@/components/meter-card";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardTitle, 
  CardHeader, 
  CardFooter, 
  CardContent, 
  CardDescription 
} from "@/components/ui/card";

const report = {
  totalUserTests: 20,
  totalUserSubjectTests: 15,
  completedUserSubjectTests: 10,
  subjectAllQuestions: 250,
  totalUserUniqueQuestions: 120,
  totalUserQuestions: 80,
  totalUserRight: 65,
  totalUserWrong: 10,
  totalUserSkipped: 5,
}

export default function Page() {

  return (
    <div className="w-full p-3 grid gap-3 auto-rows-min grid-cols-1 lg:grid-cols-5 justify-content-between ">

      <Metercard 
          title={"Total Tests"} 
          footer={"all users taken tests"} 
          color="blueviolet"
          count={report.totalUserTests}
          total={report.totalUserTests}
      />

      <Metercard 
          title={"Completed Tests"} 
          footer={"all users finished tests"} 
          color="pink"
          count={report.completedUserSubjectTests}
          total={report.totalUserSubjectTests}
      />
      
      <Metercard 
          title={"Subjects"} 
          footer={"all subjects available"} 
          color="brown"
          count={report.totalUserSubjectTests}
          total={report.totalUserTests}
      />

      <Metercard 
          title={"Users"} 
          footer={"all users count"} 
          color="brown"
          count={report.totalUserSubjectTests}
          total={report.totalUserTests}
      />

      <Metercard 
          title={"Verified Users"} 
          footer={"all users who verified their email"} 
          color="brown"
          count={report.totalUserSubjectTests}
          total={report.totalUserTests}
      />

      <Barchart className="col-span-1 lg:col-span-3" />

      <Card className="col-span-1 lg:col-span-2 text-center">
        <CardHeader>
          <CardTitle>Subjects Available</CardTitle>
          <CardDescription>Subjects with Questions count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <p className="leading-7">Movies</p>
            <p className="leading-7">50 Questions</p>
          </div>
          <Separator className="my-2" />
          
          <div className="flex justify-between">
            <p className="leading-7">Math</p>
            <p className="leading-7">500 Questions</p>
          </div>
          <Separator className="my-2" />
          
        </CardContent>
        <CardFooter/>
      </Card>

    </div>
  )
}
