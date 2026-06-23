'use client';

import styles from "./module-css/pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className={styles.container} aria-label="Pagination Navigation">
      <ul className={styles.paginationList}>
        <li>
          <button
            className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo; Prev
          </button>
        </li>

        <li>
          <button
            className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next &raquo;
          </button>
        </li>
      </ul>
    </div>
  );
}
