using Microsoft.EntityFrameworkCore;

namespace Web_API_CRUD.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options) :base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }


    }
}
