export class Employee {
  private name: string
  private salary: number
  private admissionDate: Date
  private salaryReadjustmentDate: Date

  constructor (name: string, salary: number) {
    this.salary = salary
    this.name = name
    this.admissionDate = new Date(Date.now())
    this.salaryReadjustmentDate = this.admissionDate
  }

  getSalary (): number {
    return this.salary
  }

  setSalary (salary: number): void {
    this.salary = salary
  }

  setSalaryReadjustmentDate (date: Date): void {
    this.salaryReadjustmentDate = date
  }

  getSalaryReadjustmentDate (): Date {
    return this.salaryReadjustmentDate
  }
}
