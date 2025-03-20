"use client";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState, useMemo } from "react";
import * as React from "react";

// Material UI imports
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import TablePagination from "@mui/material/TablePagination";

// Icons
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

// For Excel export
import * as XLSX from "xlsx";

/** ===========================
 *  Types (based on your schema)
 *  =========================== */
interface Paper {
  paperId: string;
  track: string;
  proceedingsPublication: string;
  fullPaperPublication: string;
  presentationType: string;
  presentationMood: string;
  payment_status: boolean;
  payment_date?: string;
  val_id?: string;
  additionalPage?: number;
}

interface Attendee {
  _id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  university: string;
  photoUrl: string;
  currency: string;
  regular_fee: number;
  early_bird_fee: number;
  visaSupport: "Yes" | "No";
  tourInterested: boolean;
  papers: Paper[];
}

/** ===========================
 *  Main Component
 *  =========================== */
const AttendeePage: React.FC = () => {
  const [attendeePageItems, setAttendeePageItems] = useState<Attendee[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Search State
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sorting
  // sortField = either "papers" or "university"
  const [sortField, setSortField] = useState<"papers" | "university">("papers");
  // sortOrder = "asc" or "desc"
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Pagination
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const router = useRouter();
  const token = Cookies.get("token");

  // If no token, redirect to /admin
  useEffect(() => {
    if (!token) router.push("/admin");
  }, [token, router]);

  useEffect(() => {
    fetchAttendeeList();
  }, []);

  /** ===========================
   *  Fetch Attendee List
   *  =========================== */
  const fetchAttendeeList = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/registration`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch AttendeeList items");
      }
      const data = await response.json();
      setAttendeePageItems(data);
      console.log("AttendeeList items:", data);
    } catch (error) {
      console.error("Error fetching AttendeeList items:", error);
      setError("Failed to fetch AttendeeList items. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /** ===========================
   *  CSV EXPORT
   *  =========================== */
  const convertToCSV = (data: Attendee[]) => {
    const headers = [
      "Name",
      "Email",
      "University",
      "Category",
      "Phone",
      "Photo Link",
      "Visa Support",
      "Tour Interested",
      "Paper ID",
      "Track",
      "Proceedings",
      "Full Paper",
      "Presentation Type",
      "Presentation Mode",
      "Additional Page",
      "Payment Status",
      "Payment Date",
      "Val ID",
    ];

    // Use flatMap to handle multiple papers per attendee.
    let rows = data.flatMap((attendee) => {
      // When there are no papers, return a row with empty paper fields.
      if (attendee.papers.length === 0) {
        return [
          [
            attendee.name,
            attendee.email,
            attendee.university,
            attendee.category,
            attendee.phone,
            attendee.photoUrl,
            attendee.visaSupport,
            attendee.tourInterested ? "Yes" : "No",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
        ];
      }
      // Map each paper into its own row with attendee details.
      return attendee.papers.map((paper) => [
        attendee.name,
        attendee.email,
        attendee.university,
        attendee.category,
        attendee.phone,
        attendee.photoUrl,
        attendee.visaSupport,
        attendee.tourInterested ? "Yes" : "No",
        paper.paperId,
        paper.track,
        paper.proceedingsPublication,
        paper.fullPaperPublication,
        paper.presentationType,
        paper.presentationMood,
        paper.additionalPage || "0",
        paper.payment_status ? "Paid" : "Not Paid",
        paper.payment_date || "",
        paper.val_id || "",
      ]);
    });

    // Sort rows by Payment Status (column index 14).
    // In this example, rows with "Paid" are sorted first, then "Not Paid",
    // and rows with empty payment status come last.
    rows = rows.sort((a, b) => {
      const getOrder = (status: string) => {
        if (status === "Paid") return 0;
        if (status === "Not Paid") return 1;
        return 2;
      };
      return getOrder(String(a[15])) - getOrder(String(b[15]));
    });

    return [headers, ...rows].map((row) => row.join(",")).join("\n");
  };

  const downloadCSV = () => {
    const csvContent = convertToCSV(attendeePageItems);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "attendee_list.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** ===========================
   *  EXCEL EXPORT
   *  =========================== */
  const downloadExcel = () => {
    const headers = [
      "Name",
      "Email",
      "University",
      "Category",
      "Phone",
      "Photo Link",
      "Visa Support",
      "Tour Interested",
      "Paper ID",
      "Track",
      "Proceedings",
      "Full Paper",
      "Presentation Type",
      "Presentation Mode",
      "Additional Page",
      "Payment Status",
      "Payment Date",
      "Val ID",
    ];

    // Expand attendees: one row per paper. If no papers, include a single row with empty paper fields.
    let rows = attendeePageItems.flatMap((attendee) => {
      if (attendee.papers.length === 0) {
        return [
          [
            attendee.name,
            attendee.email,
            attendee.university,
            attendee.category,
            attendee.phone,
            attendee.photoUrl,
            attendee.visaSupport,
            attendee.tourInterested ? "Yes" : "No",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
          ],
        ];
      }
      return attendee.papers.map((paper) => [
        attendee.name,
        attendee.email,
        attendee.university,
        attendee.category,
        attendee.phone,
        attendee.photoUrl,
        attendee.visaSupport,
        attendee.tourInterested ? "Yes" : "No",
        paper.paperId,
        paper.track,
        paper.proceedingsPublication,
        paper.fullPaperPublication,
        paper.presentationType,
        paper.presentationMood,
        paper.additionalPage || "0",
        paper.payment_status ? "Paid" : "Not Paid",
        paper.payment_date || "",
        paper.val_id || "",
      ]);
    });

    // Sort rows by Payment Status (column index 14).
    // Rows with "Paid" come first, then "Not Paid", and then any empty payment statuses.
    rows = rows.sort((a, b) => {
      const getOrder = (status: string) => {
        if (status === "Paid") return 0;
        if (status === "Not Paid") return 1;
        return 2;
      };
      return getOrder(String(a[15])) - getOrder(String(b[15]));
    });

    // Prepare worksheet data (headers + sorted rows).
    const worksheetData = [headers, ...rows];

    // Create worksheet and workbook using XLSX.
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendees");

    // Write workbook as a binary array.
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download.
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendee_list.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** ===========================
   *  PAPER PAYMENT STATUS HELPER
   *  =========================== */
  // If an attendee has at least one paper, we check if *all* are paid
  // Return "Paid", "Unpaid", or "No Papers"
  const getPaperPaymentStatus = (attendee: Attendee) => {
    if (!attendee.papers || attendee.papers.length === 0) {
      return "No Papers";
    }
    const allPaid = attendee.papers.every((paper) => paper.payment_status);
    return allPaid ? "Paid" : "Unpaid";
  };

  /** ===========================
   *  SEARCH FILTER
   *  =========================== */
  const filteredAttendees = useMemo(() => {
    return attendeePageItems.filter((attendee) => {
      const nameMatch = attendee.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const universityMatch = attendee.university
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return nameMatch || universityMatch;
    });
  }, [attendeePageItems, searchQuery]);

  /** ===========================
   *  SORTING LOGIC
   *  =========================== */
  const sortedAttendees = useMemo(() => {
    if (sortField === "papers") {
      // Sort by Paper Payment Status: "Paid" < "Unpaid" < "No Papers"
      const mapStatusToString = (status: string) => {
        if (status === "Paid") return "A";
        if (status === "Unpaid") return "B";
        return "C"; // "No Papers"
      };

      return [...filteredAttendees].sort((a, b) => {
        const aStatus = mapStatusToString(getPaperPaymentStatus(a));
        const bStatus = mapStatusToString(getPaperPaymentStatus(b));

        if (sortOrder === "asc") return aStatus.localeCompare(bStatus);
        return bStatus.localeCompare(aStatus);
      });
    } else {
      // Sort by "university" (alphabetically)
      return [...filteredAttendees].sort((a, b) => {
        const aUni = a.university.toLowerCase();
        const bUni = b.university.toLowerCase();

        if (sortOrder === "asc") {
          return aUni.localeCompare(bUni);
        } else {
          return bUni.localeCompare(aUni);
        }
      });
    }
  }, [filteredAttendees, sortField, sortOrder]);

  /** ===========================
   *  PAGINATION
   *  =========================== */
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedAttendees = useMemo(() => {
    return sortedAttendees.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [sortedAttendees, page, rowsPerPage]);

  /** ===========================
   *  FINAL ARRAY (Sorted & Searched + Paginated)
   *  =========================== */
  const finalAttendees = paginatedAttendees;

  // Count total number of paid papers
  const paidPapersCount = attendeePageItems.reduce((total, attendee) => {
    const paidPapersForAttendee = attendee.papers.filter(
      (paper) => paper.payment_status
    ).length;
    return total + paidPapersForAttendee;
  }, 0);

  // Total amount paid for all paid papers
  const totalPaidAmount = attendeePageItems.reduce((sum, attendee) => {
    // Sum only the paid papers
    const perAttendeeTotal = attendee.papers
      .filter((paper) => paper.payment_status)
      .reduce((paperSum, paper) => {
        return paperSum + calculatePaidAmount(attendee, paper);
      }, 0);

    return sum + perAttendeeTotal;
  }, 0);

  const downloadPaidExcel = () => {
    const headers = [
      "Name",
      "Email",
      "University",
      "Category",
      "Phone",
      "Photo Link",
      "Visa Support",
      "Tour Interested",
      "Paper ID",
      "Track",
      "Proceedings",
      "Full Paper",
      "Presentation Type",
      "Presentation Mode",
      "Additional Page",
      "Payment Status",
      "Payment Date",
      "Val ID",
      "Amount",
    ];

    // Filter attendees who have at least one paper marked as paid
    let paidAttendees = attendeePageItems.filter((attendee) =>
      attendee.papers.some((paper) => paper.payment_status)
    );

    // Expand attendees: one row per paper. If no papers, include a single row with empty paper fields.
    let rows = paidAttendees.flatMap((attendee) => {
      // Filter to only include papers that are paid
      const paidPapers = attendee.papers.filter(
        (paper) => paper.payment_status
      );

      if (paidPapers.length === 0) {
        // If no paid papers, don't include this attendee in the Excel export
        return [];
      }

      // Return an array of row arrays
      return paidPapers.map((paper) => {
        // Calculate the total amount for this row
        const paidAmount = calculatePaidAmount(attendee, paper);

        return [
          attendee.name,
          attendee.email,
          attendee.university,
          attendee.category,
          attendee.phone,
          attendee.photoUrl,
          attendee.visaSupport,
          attendee.tourInterested ? "Yes" : "No",
          paper.paperId,
          paper.track,
          paper.proceedingsPublication,
          paper.fullPaperPublication,
          paper.presentationType,
          paper.presentationMood,
          paper.additionalPage || "0",
          "Paid",
          paper.payment_date || "",
          paper.val_id || "",
          paidAmount.toString(),
        ];
      });
    });

    // Sort rows by Payment Status (column index 14).
    rows = rows.sort((a, b) => {
      const getOrder = (status: string) => {
        if (status === "Paid") return 0;
        if (status === "Not Paid") return 1;
        return 2;
      };
      return getOrder(String(a[15])) - getOrder(String(b[15]));
    });

    // 3. Compute a grand total of the “Paid Amount” column
    //    Remember that "Paid Amount" is the last column (index 18).
    const grandTotal = rows.reduce((sum, row) => {
      const paidAmountStr = row[18] || "0"; // safe-guard
      return sum + Number(paidAmountStr);
    }, 0);

    // Prepare worksheet data (headers + sorted rows).
    const worksheetData = [headers, ...rows];
    // 5. Add an extra row for the grand total at the bottom
    //    (You can style or label these cells however you like.)
    worksheetData.push([]);
    worksheetData.push([
      "", // keep empty cells for alignment
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Grand Total", // label
      grandTotal.toString(), // value
    ]);

    // Create worksheet and workbook using XLSX.
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendees");

    // Write workbook as a binary array.
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);

    // Create a temporary link to trigger the download.
    const link = document.createElement("a");
    link.href = url;
    link.download = "paid_attendee_list.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /** ===========================
   *  COLLAPSIBLE ROW COMPONENT
   *  =========================== */
  const Row = ({ row }: { row: Attendee }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow
          hover
          sx={{
            "& > *": { borderBottom: "unset" },
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
          }}
          className="transition-all duration-200"
          onClick={() => setOpen(!open)}
        >
          <TableCell className="border-b border-gray-200">
            <TableCell className="border-b border-gray-200">
              <div className="flex items-center gap-2">
                {row.photoUrl ? (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 relative rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={row.photoUrl}
                      alt={`${row.name}'s photo`}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/40?text=?";
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0">
                    {row.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                  className="rounded-full hover:bg-gray-100 transition-colors"
                >
                  {open ? (
                    <KeyboardArrowUpIcon className="text-blue-600" />
                  ) : (
                    <KeyboardArrowDownIcon className="text-gray-600" />
                  )}
                </IconButton>
              </div>
            </TableCell>
          </TableCell>
          <TableCell
            component="th"
            scope="row"
            className="font-medium text-gray-900 border-b border-gray-200"
          >
            {row.name}
          </TableCell>
          <TableCell className="border-b border-gray-200 text-gray-700">
            {row.email}
          </TableCell>
          <TableCell className="border-b border-gray-200 text-gray-700">
            {row.phone}
          </TableCell>
          <TableCell className="border-b border-gray-200 text-gray-700">
            {row.university}
          </TableCell>
          <TableCell className="border-b border-gray-200 text-gray-700">
            {row.category}
          </TableCell>
          <TableCell className="border-b border-gray-200 text-gray-700">
            {row.visaSupport}
          </TableCell>
          <TableCell className="border-b border-gray-200">
            <span
              className={`px-2 py-1 rounded-full text-xs ${
                row.tourInterested
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {row.tourInterested ? "Yes" : "No"}
            </span>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={8}
            className="border-0"
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{ margin: 2 }}
                className="bg-gray-50 rounded-lg p-4 shadow-inner"
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  className="text-gray-800 font-semibold flex items-center border-b border-gray-300 pb-2"
                >
                  <span className="mr-2">📄</span> Papers Submitted
                </Typography>
                <Table
                  size="small"
                  aria-label="papers"
                  sx={{ mb: 2 }}
                  className="bg-white rounded-lg overflow-hidden"
                >
                  <TableHead>
                    <TableRow className="bg-gray-100">
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Paper ID
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Track
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Proceedings
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Full Paper
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Presentation Type
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Presentation Mode
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Addi. Pages
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Payment Status
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Amount
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Payment Date
                      </TableCell>
                      <TableCell className="font-semibold text-sm text-gray-700">
                        Val ID
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.papers && row.papers.length > 0 ? (
                      row.papers.map((paper) => (
                        <TableRow
                          key={paper.paperId}
                          hover
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.paperId}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.track}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.proceedingsPublication}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.fullPaperPublication}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.presentationType}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.presentationMood}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.additionalPage}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                paper.payment_status
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {paper.payment_status ? "Paid" : "Unpaid"}
                            </span>
                          </TableCell>
                          {/* //////////////////// */}

                          {(() => {
                            const earlyBirdDeadline = new Date(
                              "2025-03-25T23:59:59Z"
                            );
                            const regularDeadline = new Date(
                              "2025-04-10T23:59:59Z"
                            );
                            const currentDate = new Date();

                            // Get fee structure based on attendee category
                            const getFeeStructure = () => {
                              switch (row.category) {
                                case "Local Delegates (Author)":
                                  return {
                                    early: 6000,
                                    regular: 7000,
                                    currency: "BDT",
                                  };
                                case "Local Delegates (Participant)":
                                  return {
                                    early: 5000,
                                    regular: 6000,
                                    currency: "BDT",
                                  };
                                case "Local Students (Author/ Co-author)":
                                  return {
                                    early: 4000,
                                    regular: 5000,
                                    currency: "BDT",
                                  };
                                case "Foreign Delegates":
                                  return {
                                    early: 43750,
                                    regular: 56250,
                                    currency: "BDT",
                                    usd_early: 350,
                                    usd_regular: 450,
                                  };
                                case "Foreign Students":
                                  return {
                                    early: 25000,
                                    regular: 31250,
                                    currency: "BDT",
                                    usd_early: 200,
                                    usd_regular: 250,
                                  };
                                default:
                                  return {
                                    early: 5000,
                                    regular: 6000,
                                    currency: "BDT",
                                  };
                              }
                            };

                            const fees = getFeeStructure();
                            const isForeign = row.category?.includes("Foreign");

                            // Determine which fee applies
                            let amount, phase;
                            if (currentDate <= earlyBirdDeadline) {
                              amount = fees.early;
                              phase = "Early Bird";
                            } else if (currentDate <= regularDeadline) {
                              amount = fees.regular;
                              phase = "Regular";
                            } else {
                              phase = "Late";
                              amount = fees.regular; // Use regular fee but mark as late
                            }

                            const additionalPageFee = paper.additionalPage
                              ? paper.additionalPage * 1000
                              : 0;
                            const TotalAmount = amount + additionalPageFee;

                            return (
                              <TableCell className="border-t border-gray-200 text-sm font-mono text-gray-600">
                                {TotalAmount} {fees.currency}
                              </TableCell>
                            );
                          })()}

                          {/* /////////////////////// */}

                          <TableCell className="border-t border-gray-200 text-sm">
                            {paper.payment_date
                              ? new Date(
                                  paper.payment_date
                                ).toLocaleDateString()
                              : "-"}
                          </TableCell>
                          <TableCell className="border-t border-gray-200 text-sm font-mono text-gray-600">
                            {paper.val_id || "-"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          align="center"
                          className="py-8 text-gray-500 italic border-t border-gray-200"
                        >
                          No papers submitted.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  /** ===========================
   *  RENDER
   *  =========================== */
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div
        className={`flex-1 p-5 md:p-8 overflow-y-auto bg-gray-50 h-screen transition-all`}
      >
        <Typography
          variant="h4"
          gutterBottom
          className="text-red-500 font-bold border-b border-gray-200 pb-3"
        >
          Attendee List
        </Typography>
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-lg font-bold">
                  {paidPapersCount}
                </span>
              </div>
              <Typography
                variant="h6"
                className="text-gray-800 font-medium m-0"
              >
                Paid Papers
              </Typography>
            </div>

            {/* <-- Add totalPaidAmount display here --> */}
            <div className="flex items-center space-x-2">
              <Typography
                variant="h6"
                className="text-gray-800 font-medium m-0"
              >
                Grand Total Paid: {totalPaidAmount} BDT
              </Typography>
            </div>

            <Button
              variant="contained"
              onClick={downloadPaidExcel}
              startIcon={<i className="fas fa-download" />}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white transition-all duration-300 transform hover:scale-105"
              sx={{
                boxShadow: "0 4px 6px rgba(239, 68, 68, 0.25)",
                borderRadius: "8px",
                padding: "8px 16px",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                "&:hover": {
                  boxShadow: "0 6px 8px rgba(220, 38, 38, 0.3)",
                },
              }}
            >
              Download Paid Papers List
            </Button>
          </div>
        </div>

        {isLoading && <></>}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md text-red-700">
            {error}
          </div>
        )}

        {/* Search and Export Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="mb-4 flex flex-col sm:flex-row gap-3">
            <TextField
              label="Search by Name or University"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#ef4444",
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ef4444",
                },
              }}
            />

            {/* Export Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outlined"
                onClick={downloadCSV}
                className="border-red-500 text-red-500 hover:bg-red-50"
                sx={{
                  borderColor: "#ef4444",
                  color: "#ef4444",
                  "&:hover": {
                    backgroundColor: "#fef2f2",
                    borderColor: "#ef4444",
                  },
                }}
              >
                CSV Export
              </Button>
              <Button
                variant="contained"
                onClick={downloadExcel}
                className="bg-red-500 hover:bg-red-600 text-white"
                sx={{
                  backgroundColor: "#ef4444",
                  "&:hover": {
                    backgroundColor: "#dc2626",
                  },
                }}
              >
                Excel Export
              </Button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <FormControl
              size="small"
              className="min-w-[200px]"
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#ef4444",
                  },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ef4444",
                },
              }}
            >
              <InputLabel id="sort-field-label">Sort By</InputLabel>
              <Select
                labelId="sort-field-label"
                id="sort-field-select"
                value={sortField}
                label="Sort By"
                onChange={(e: SelectChangeEvent<"papers" | "university">) =>
                  setSortField(e.target.value as "papers" | "university")
                }
              >
                <MenuItem value="papers">Paper Payment Status</MenuItem>
                <MenuItem value="university">University</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              startIcon={
                sortOrder === "asc" ? (
                  <ArrowUpwardIcon />
                ) : (
                  <ArrowDownwardIcon />
                )
              }
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              sx={{
                borderColor: "#ef4444",
                color: "#ef4444",
                "&:hover": {
                  backgroundColor: "#fef2f2",
                  borderColor: "#ef4444",
                },
              }}
              className="border-red-500 text-red-500 hover:bg-red-50"
            >
              {sortOrder === "asc" ? "Ascending" : "Descending"}
            </Button>
          </div>
        </div>

        {/* Table Rendering */}
        <TableContainer
          component={Paper}
          className="rounded-lg shadow-md overflow-hidden"
        >
          <Table aria-label="collapsible table">
            <TableHead className="bg-red-500">
              <TableRow>
                <TableCell className="text-white" />
                <TableCell className="text-white font-semibold">Name</TableCell>
                <TableCell className="text-white font-semibold">
                  Email
                </TableCell>
                <TableCell className="text-white font-semibold">
                  Phone
                </TableCell>
                <TableCell className="text-white font-semibold">
                  University
                </TableCell>
                <TableCell className="text-white font-semibold">
                  Category
                </TableCell>
                <TableCell className="text-white font-semibold">
                  Visa Support
                </TableCell>
                <TableCell className="text-white font-semibold">
                  Tour Interested
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white">
              {finalAttendees && finalAttendees.length > 0 ? (
                finalAttendees.map((row) => <Row key={row._id} row={row} />)
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    align="center"
                    className="py-8 text-gray-500"
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                      </div>
                    ) : (
                      "No attendees found matching your criteria."
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Controls */}
        <TablePagination
          component="div"
          count={sortedAttendees.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className="mt-4 bg-white rounded-lg shadow-sm"
          sx={{
            ".MuiTablePagination-selectIcon": {
              color: "#ef4444",
            },
            ".MuiTablePagination-actions .MuiIconButton-root.Mui-disabled": {
              color: "rgba(239, 68, 68, 0.26)",
            },
            ".MuiTablePagination-actions .MuiIconButton-root": {
              color: "#ef4444",
            },
          }}
        />
      </div>
    </div>
  );
};

export default AttendeePage;

// You can place this anywhere outside your component (e.g., top of file).
function calculatePaidAmount(attendee: Attendee, paper: Paper): number {
  // For demonstration, we’ll replicate the same logic you used in the table:

  // Deadlines
  const earlyBirdDeadline = new Date("2025-03-25T23:59:59Z");
  const regularDeadline = new Date("2025-04-10T23:59:59Z");

  // If you want to base it on the paper.payment_date (when the user actually paid):
  // If there's no payment_date, fallback to "now" or do any default you like.
  const paymentDate = paper.payment_date
    ? new Date(paper.payment_date)
    : new Date();

  // Helper function to get the fee structure based on category
  const getFeeStructure = () => {
    switch (attendee.category) {
      case "Local Delegates (Author)":
        return { early: 6000, regular: 7000, currency: "BDT" };
      case "Local Delegates (Participant)":
        return { early: 5000, regular: 6000, currency: "BDT" };
      case "Local Students (Author/ Co-author)":
        return { early: 4000, regular: 5000, currency: "BDT" };
      case "Foreign Delegates":
        return {
          early: 43750,
          regular: 56250,
          currency: "BDT",
          usd_early: 350,
          usd_regular: 450,
        };
      case "Foreign Students":
        return {
          early: 25000,
          regular: 31250,
          currency: "BDT",
          usd_early: 200,
          usd_regular: 250,
        };
      default:
        // Some sensible default
        return { early: 5000, regular: 6000, currency: "BDT" };
    }
  };

  const fees = getFeeStructure();

  // Decide which fee applies based on paymentDate
  let baseFee = 0;
  if (paymentDate <= earlyBirdDeadline) {
    baseFee = fees.early; // Early Bird
  } else if (paymentDate <= regularDeadline) {
    baseFee = fees.regular; // Regular
  } else {
    baseFee = fees.regular; // Late (for demonstration, same as regular)
  }

  // Additional pages
  const additionalPageFee = paper.additionalPage
    ? paper.additionalPage * 1000
    : 0;

  return baseFee + additionalPageFee;
}
