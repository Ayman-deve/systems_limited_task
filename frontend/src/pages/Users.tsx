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
      size: 200,
      Cell: ({ cell }) => (
        <div style={{ fontWeight: 500 }}>{cell.getValue<string>()}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 250,
      Cell: ({ cell }) => (
        <div style={{ color: '#666' }}>{cell.getValue<string>()}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      size: 120,
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
    enableColumnResizing: true,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGlobalFilter: true,
    enableGrouping: true,
    enableHiding: true,
    enableStickyHeader: true,
    initialState: {
      showGlobalFilter: false,
      pagination: { pageSize: 10, pageIndex: 0 },
      showColumnFilters: false,
    },
    paginationDisplayMode: 'pages',
    muiTableContainerProps: {
      sx: {
        maxHeight: '600px',
      },
    },
    muiTableBodyCellProps: {
      sx: {
        borderRight: '1px solid rgba(224, 224, 224, 0.5)',
        borderBottom: '1px solid rgba(224, 224, 224, 0.5)',
      },
    },
    muiTableHeadCellProps: {
      sx: {
        borderRight: '1px solid rgba(224, 224, 224, 0.5)',
        backgroundColor: '#fafafa',
      },
    },
  });

  return (
    <div className="page-container">
      <div className="section-header">
        <h2>Users</h2>
      </div>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <MaterialReactTable table={table} />
        </div>
      )}
    </div>
  );
};

export default Users;
