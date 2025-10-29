import React, { useState, useEffect } from 'react';
import {
  useMaterialReactTable,
  MaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import * as taskAPI from '../api/tasks';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getAllUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      Cell: ({ cell }) => (
        <div style={{ fontWeight: 500 }}>{cell.getValue<string>()}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      Cell: ({ cell }) => (
        <div style={{ color: '#666' }}>{cell.getValue<string>()}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      Cell: ({ cell }) => {
        const role = cell.getValue<string>();
        return (
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500,
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
            }}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </span>
        );
      },
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: users,
    enableColumnResizing: false,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableGrouping: true,
    enableHiding: true,
    enableStickyHeader: true,
    enableBottomToolbar: true,
    enableDensityToggle: false,
    initialState: {
      showGlobalFilter: false,
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: false,
      density: 'compact',
    },
    paginationDisplayMode: 'pages',
    muiTableContainerProps: {
      sx: {
        maxHeight: '600px',
        '@media (max-width: 768px)': {
          maxHeight: 'none',
        },
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: '1px solid rgba(224, 224, 224, 0.5)',
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
        '@media (max-width: 768px)': {
          borderRight: 'none',
          padding: '8px 4px',
          fontSize: '13px',
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderRight: '1px solid rgba(224, 224, 224, 0.5)',
        backgroundColor: '#fafafa',
        '@media (max-width: 768px)': {
          borderRight: 'none',
          padding: '8px 4px',
          fontSize: '11px',
          fontWeight: 600,
        },
      },
    },
    muiTablePaperProps: {
      sx: {
        '@media (max-width: 768px)': {
          boxShadow: 'none',
        },
      },
    },
    muiPaginationProps: {
      sx: {
        '@media (max-width: 768px)': {
          '& .MuiToolbar-root': {
            flexWrap: 'wrap',
            gap: '8px',
          },
        },
      },
    },
  });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5 flex-wrap gap-2.5 md:flex-col md:items-start">
        <h2 className="text-xl font-bold text-black md:text-lg sm:text-base">Users</h2>
      </div>

      {loading ? (
        <div className="text-center py-10 text-base text-[#666]">Loading users...</div>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm w-full overflow-x-auto">
          <MaterialReactTable table={table} />
        </div>
      )}
    </div>
  );
};

export default Users;
