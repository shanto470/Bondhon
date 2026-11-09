import Swal from "sweetalert2";

const base = {
  background: "var(--color-base-100)",
  color: "var(--color-base-content)",
  confirmButtonColor: "#d64545",
  cancelButtonColor: "#6b7a76",
};

export const confirmDialog = (title: string, text: string, confirmText: string) =>
  Swal.fire({ ...base, title, text, icon: "warning", showCancelButton: true, confirmButtonText: confirmText });
