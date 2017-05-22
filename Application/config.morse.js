/*
 * Define all configuration to the morse table
 * @author: Khoa (Brian) Tran - patra3@student.monash.edu
 * @author: Thanh Doan
 */
const timeUnit = 2000; // 1000 ms

module.exports = {
	"dot": timeUnit,
	"dash": 3 * timeUnit,
	"letterGap": 3 * timeUnit,
	"wordGap": 7 * timeUnit,
	"dotSym": "S",
	"dashSym": "L",
	"letterGapSym": "&",
	"wordGapSym": "_",
	"table": {
		"SL": "A",
		"LSSS": "B",
		"LSLS": "C",
		"LSS": "D",
		"S": "E",
		"SSLS": "F",	
		"LLS": "G",
		"SSSS": "H",
		"SS": "I",	
		"SLLL": "J",
		"LSL": "K",	
		"SLSS": "L",
		"LL": "M",
		"LS": "N",
		"LLL": "O",
		"SLLS": "P",
		"LLSL": "Q",
		"SLS": "R",
		"SSS": "S",
		"L": "T",
		"SSL": "U",
		"SSSL": "V",
		"SLL": "W",
		"LSSL": "X",
		"LSLL": "Y",
		"LLSS": "Z"
	}
}
