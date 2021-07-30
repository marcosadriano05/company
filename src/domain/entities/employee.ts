export class Employee {
  private name: string
  private salary: number
  private admissionDate: Date

  constructor (name: string, salary: number) {
    this.salary = salary
    this.name = name
  }

  getName (): string {
    return this.name
  }

  getSalary (): number {
    return this.salary
  }

  setSalary (salary: number): void {
    this.salary = salary
  }

  getAdmissionDate (): Date {
    return this.admissionDate
  }

  setAdmissionDate (date: Date): void {
    this.admissionDate = date
  }
}
