export class Employee {
  private name: string
  private salary: number

  constructor (name: string, salary: number) {
    this.salary = salary
    this.name = name
  }

  getSalary (): number {
    return this.salary
  }
}
