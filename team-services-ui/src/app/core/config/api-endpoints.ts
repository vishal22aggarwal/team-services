export class ApiEndpoints {
    // public static readonly BASE_URL = "https://team-service-data.onrender.com";
    public static readonly BASE_URL = "http://localhost:8080";
    public static readonly USERS = `http://localhost:8080/api/users`;
    public static readonly EMPLOYEEDATA = `${this.BASE_URL}/api/employeesData`;
    public static readonly EMPLOYEEATTENDENCES = ` http://localhost:3000/api/employeeAttendances`;
    public static readonly TrainingData = `http://localhost:8080/api/training`; // my comments
}
