export const AccountListItem = ({ account }) => {
  return (
    <tr className="border-b hover:bg-gray-100 transition-all duration-200">
      <td className="px-6 py-4 text-sm text-gray-800">{account.accountNumber}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{account.name}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{account.typeAccount}</td>
      <td className="px-6 py-4 text-sm text-gray-800">{account.allowMovement ? 'Sí' : 'No'}</td>
    </tr>
  );
};
