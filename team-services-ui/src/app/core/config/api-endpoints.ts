export class ApiEndpoints {
    // public static readonly BASE_URL = "https://team-service-data.onrender.com";
    public static readonly BASE_URL = "http://localhost:3000";
    public static readonly USERS = `http://localhost:8080/api/users`;
    public static readonly EMPLOYEEDATA = `${this.BASE_URL}/employeesData`;
    public static readonly EMPLOYEEATTENDENCES = `${this.BASE_URL}/employeeAttendances`;
    public static readonly TrainingData = `${this.BASE_URL}/trainingData`; // my comments
}
